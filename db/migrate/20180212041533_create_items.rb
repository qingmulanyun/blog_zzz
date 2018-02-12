class CreateItems < ActiveRecord::Migration
  def change
    create_table :items , id: :uuid do |t|
      t.string :name
      t.string :image_url
      t.float :price
      t.float :cost
      t.string :discription
      t.string :status

      t.timestamps null: false
    end
  end
end
