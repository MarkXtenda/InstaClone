class ChangePostColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :likes, :liked
  end
end
