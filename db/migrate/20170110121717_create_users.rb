class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users, id: :uuid do |t|
      t.string :first_name
      t.string :last_name
      t.string :nickname
      t.string :image_url
      t.string :role
      t.string :phone
      t.string :status


      t.timestamps
      t.index :phone,  unique: true
    end
  end
end