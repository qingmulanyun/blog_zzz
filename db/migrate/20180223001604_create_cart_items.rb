class CreateCartItems < ActiveRecord::Migration[5.0]
  def change
    create_table :cart_items, id: :uuid  do |t|
      t.references :cart, foreign_key: true, type: :uuid, index: true
      t.references :item, foreign_key: true, type: :uuid, index: true
      t.integer :quantity
      t.timestamps
    end
  end
end
