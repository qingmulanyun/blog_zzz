class AddWishProductToItem < ActiveRecord::Migration[5.1]
  def change
    add_reference :items, :wish_product, type: :uuid, foreign_key: true
  end
end
