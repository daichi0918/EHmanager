module Api
  module V1
    class ListsController < ApplicationController
      def index
        user = User.find(params[:user_id])
        lists = user.lists

        render json: {
          lists: lists
        }, status: :ok
      end
    end
  end
end
