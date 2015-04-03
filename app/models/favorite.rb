# == Schema Information
#
# Table name: favorites
#
#  id               :integer          not null, primary key
#  favoritable_id   :integer
#  favoritable_type :string(255)
#  user_id          :integer
#  created_at       :datetime
#  updated_at       :datetime
#

class Favorite < ActiveRecord::Base
end
