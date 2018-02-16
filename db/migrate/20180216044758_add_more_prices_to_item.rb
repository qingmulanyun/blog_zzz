class AddMorePricesToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :original_price, :float, default: 0
    add_column :items, :transport_cost, :float, default: 0
  end
end


