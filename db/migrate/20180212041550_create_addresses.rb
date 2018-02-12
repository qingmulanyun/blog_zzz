class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses, id: :uuid do |t|

      t.string :country
      t.string :address_line_1
      t.string :province
      t.string :zip_code

      t.timestamps null: false
    end
  end
end
