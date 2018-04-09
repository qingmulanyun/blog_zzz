class CreateWishProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :wish_products , id: :uuid do |t|
      t.string :name
      t.string :status
      t.string :image
      t.references :user, foreign_key: true, type: :uuid, index: true
      t.references :item_brand, foreign_key: true, type: :uuid, index: true
      t.references :item_type, foreign_key: true, type: :uuid, index: true
      t.timestamps
    end
  end
end
