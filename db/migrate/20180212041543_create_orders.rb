class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders, id: :uuid do |t|
      t.references :seller, type: :uuid, index: true
      t.references :buyer, type: :uuid, index: true
      t.string :status
      t.timestamps null: false
    end
  end
end
