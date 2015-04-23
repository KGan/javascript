# == Schema Information
#
# Table name: user_feeds
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  feed_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class UserFeed < ActiveRecord::Base
  belongs_to :user
  belongs_to :feed
end
