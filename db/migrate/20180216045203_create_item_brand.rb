class CreateItemBrand < ActiveRecord::Migration[4.2]
  def change
    create_table :item_brands, id: :uuid do |t|
      t.string :name
      t.string :location
      t.timestamps null: false
    end
  end
end
