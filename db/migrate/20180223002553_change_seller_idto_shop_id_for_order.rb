class ChangeSellerIdtoShopIdForOrder < ActiveRecord::Migration[5.1]
  def change
    remove_reference :orders, :seller, type: :uuid, index: true
    add_reference :orders, :shop, type: :uuid, foreign_key: true, index: true
  end
end
