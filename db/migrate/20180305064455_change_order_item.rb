class ChangeOrderItem < ActiveRecord::Migration[5.1]
  def change
    add_column :order_items, :price, :float
    add_column :order_items, :transport_cost, :float
  end
end
