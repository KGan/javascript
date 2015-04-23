class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :favoritable_id
      t.string :favoritable_type
      t.integer :user_id

      t.timestamps
    end
  end
end
