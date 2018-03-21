class AddCityToAddresses < ActiveRecord::Migration[5.1]
  def change
    add_column :addresses, :city, :string
    add_column :addresses, :area, :string
    add_column :addresses, :receiver_name, :string
    add_column :addresses, :receiver_phone, :string
  end
end
