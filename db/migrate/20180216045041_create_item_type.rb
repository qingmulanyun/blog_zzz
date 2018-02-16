class CreateItemType < ActiveRecord::Migration[4.2]
  def change
    create_table :item_types, id: :uuid do |t|

      t.string :name
      t.string :status
      t.timestamps null: false
    end
  end
end
