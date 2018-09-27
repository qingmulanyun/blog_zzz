class AddMoneyToItem < ActiveRecord::Migration[5.2]
  def change
    add_monetize :items, :price
    add_monetize :items, :original_price
    add_monetize :items, :transport_cost
    add_monetize :items, :sale_price

    rename_column :items, :price, :price_legacy
    rename_column :items, :original_price, :original_price_legacy
    rename_column :items, :transport_cost, :transport_cost_legacy
    rename_column :items, :sale_price, :sale_price_legacy
    
    add_monetize :orders, :sold_price

    rename_column :orders, :sold_price, :sold_price_legacy

    add_monetize :order_items, :price
    add_monetize :order_items, :transport_cost

    rename_column :order_items, :price, :price_legacy
    rename_column :order_items, :transport_cost, :transport_cost_legacy
  end
end
