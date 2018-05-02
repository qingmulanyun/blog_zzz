class CreatePromotions < ActiveRecord::Migration[5.0]
  def change
    create_table :promotions , id: :uuid do |t|
      t.string   :name
      t.string   :description
      t.datetime :start_date
      t.datetime :end_date
      t.boolean  :active
      t.string   :type
      t.float    :amount

      t.timestamps

      t.index :name , unique: true
    end

  end
end
