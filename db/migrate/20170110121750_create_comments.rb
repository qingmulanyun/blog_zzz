class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments, id: :uuid do |t|
      t.uuid :post_id
      t.uuid :user_id
      t.text :content

      t.timestamps null: false
    end
  end
end