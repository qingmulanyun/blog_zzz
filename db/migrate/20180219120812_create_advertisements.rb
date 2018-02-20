class CreateAdvertisements < ActiveRecord::Migration[5.0]
  def change
    create_table :advertisements, id: :uuid  do |t|
      t.string :title
      t.string :image
      t.string :status
      t.text :content

      t.timestamps
    end
  end
end
