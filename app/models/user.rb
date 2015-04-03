# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }


  after_initialize :ensure_session_token

  attr_reader :password

  has_many :user_feeds, dependent: :destroy
  has_many :feeds, through: :user_feeds

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.update(session_token: SecureRandom.urlsafe_base64)
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(opts)
    user = self.find_by_username(opts[:username])
    (user && user.is_password?(opts[:password])) ? user : nil
  end
end
