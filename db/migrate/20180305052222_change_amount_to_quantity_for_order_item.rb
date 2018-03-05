class ChangeAmountToQuantityForOrderItem < ActiveRecord::Migration[5.1]
  def change
    rename_column :order_items, :amount, :quantity
  end
end
