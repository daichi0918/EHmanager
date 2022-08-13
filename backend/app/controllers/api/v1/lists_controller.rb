module Api
  module V1
    class ListsController < ApplicationController
      before_action :set_list,only: %i[create destroy]

      def index
        user = User.find(params[:user_id])
        lists = user.lists

        render json: {
          lists: lists
        }, status: :ok
      end

      def create

      end

      def destroy
        @list.destroy
        render json: { status: 'SUCCESS', message: 'Deleted the list', data: @list } 
      end

      private

      def set_list
        # user = User.find(params[:user_id])
        # List = user.lists
        @list = List.find(params[:id])
      end

    end
  end
end
