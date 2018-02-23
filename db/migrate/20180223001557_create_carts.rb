class CreateCarts < ActiveRecord::Migration[5.0]
  def change
    create_table :carts, id: :uuid  do |t|
      t.references :user, foreign_key: true, type: :uuid, index: true

      t.timestamps
    end
  end
end
