require 'rails_helper'

RSpec.describe "Lists", type: :request do
  describe "GET lists" do
    it "全てのリスト(ユーザーごと)を取得する" do
      get 'http://localhost:3001/api/v1/users/1/lists'
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
    end
  end

  describe "POST list" do
    it "works! (now write some real specs)" do
      list = create(:list)
      expect { post 'http://localhost:3001/api/v1/users/1/lists', params: { user_id: list.user_id, name: list.name } }.to change(List, :count).by(+1)
      expect(response.status).to eq(200)
    end
  end

  describe 'DELETE list' do
    it 'listを削除する' do
      list = create(:list)
      expect { delete "http://localhost:3001/api/v1/users/1/lists/#{list.id}" }.to change(List, :count).by(-1)
      expect(response.status).to eq(200)
    end
  end



end


