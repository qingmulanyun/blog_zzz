class AddAddressIdToOrder < ActiveRecord::Migration[5.1]
  def change
    add_reference :orders, :address, type: :uuid, foreign_key: true
  end
end
