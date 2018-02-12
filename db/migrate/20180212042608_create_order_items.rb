class CreateOrderItems < ActiveRecord::Migration
  def change
    create_table :order_items , id: :uuid do |t|
      t.references :item, foreign_key: true, type: :uuid, index: true
      t.references :order, foreign_key: true, type: :uuid, index: true
      t.integer :amount
      t.timestamps null: false
    end
  end
end
