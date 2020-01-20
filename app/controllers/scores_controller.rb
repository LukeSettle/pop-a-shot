class ScoresController < ApplicationController
  def create
    @score = Score.create(score_params)
    redirect_to root_path
  end

  def index
    @scores = Score.all
  end

  private

  def score_params
    params.require(:score).permit(:value, :name)
  end
end