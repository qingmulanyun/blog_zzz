class AddAvatarToItemBrand < ActiveRecord::Migration[5.1]
  def change
    add_column :item_brands, :avatar, :string
  end
end
