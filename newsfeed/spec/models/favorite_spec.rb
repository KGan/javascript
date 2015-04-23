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

require 'spec_helper'

describe Favorite do
  pending "add some examples to (or delete) #{__FILE__}"
end
