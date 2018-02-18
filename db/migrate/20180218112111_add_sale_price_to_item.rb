class AddSalePriceToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :sale_price, :float, default: 0
    add_column :items, :commission, :float
    add_column :items, :weight, :integer
    remove_column :items, :cost, :float
  end
end
