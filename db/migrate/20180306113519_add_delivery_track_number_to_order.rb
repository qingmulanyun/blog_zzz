class AddDeliveryTrackNumberToOrder < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :delivery_track_number, :string
  end
end
