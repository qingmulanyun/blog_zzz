class CreateCarriers < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'pgcrypto'
    create_table :carriers, id: :uuid  do |t|
      t.string :name
      t.string :internal_symbol
      t.string :status
      t.string :description
      t.timestamps
    end
    
    add_index :carriers, :internal_symbol, using: :btree, unique: true
    add_reference :orders, :carrier, type: :uuid, foreign_key: true
  end
end
