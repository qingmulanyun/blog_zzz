class AddOrderPriceToOrder < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :sold_price, :float
  end
end
