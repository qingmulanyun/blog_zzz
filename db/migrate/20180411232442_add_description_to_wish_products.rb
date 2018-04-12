class AddDescriptionToWishProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :wish_products, :description, :text
    change_column :items, :description, :text
  end
end
