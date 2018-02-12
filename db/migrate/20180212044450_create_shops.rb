class CreateShops < ActiveRecord::Migration[4.2]
  def change
    create_table :shops , id: :uuid do |t|
      t.string :name

      t.string :description
      t.references :user, foreign_key: true, type: :uuid, index: true
      t.timestamps null: false
    end
  end
end
