class AddSentAtToOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :sent_at, :datetime
    add_index :orders, :status, using: :btree
    add_index :items, :starred, using: :btree
  end
end
