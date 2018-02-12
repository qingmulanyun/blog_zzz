class AddShopToItem < ActiveRecord::Migration
  def change
    add_reference :items, :shop, type: :uuid, foreign_key: true
  end
end
