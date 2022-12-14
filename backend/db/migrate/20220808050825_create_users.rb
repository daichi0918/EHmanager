# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :encrypted_password, null: false
      t.integer :gender, null: false, default: 0
      t.string :image
      t.string :memo

      t.timestamps
    end
  end
end
