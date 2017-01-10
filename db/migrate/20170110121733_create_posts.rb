class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts, id: :uuid do |t|
      t.string :title
      t.text :content
      t.uuid :user_id


      t.timestamps null: false
    end
  end
end