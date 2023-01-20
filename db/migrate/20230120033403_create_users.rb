class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string "username"
      t.string "avatar"
      t.string "bio"
      t.belongs_to :author
      t.timestamps
    end
  end
end
