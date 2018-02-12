class AddShopToItem < ActiveRecord::Migration[4.2]
  def change
    add_reference :items, :shop, type: :uuid, foreign_key: true
  end
end
