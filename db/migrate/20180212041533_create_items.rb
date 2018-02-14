class CreateItems < ActiveRecord::Migration[4.2]
  def change
    create_table :items , id: :uuid do |t|
      t.string :name
      t.string :image_url
      t.float :price
      t.float :cost
      t.string :description
      t.string :status

      t.timestamps null: false
    end
  end
end
