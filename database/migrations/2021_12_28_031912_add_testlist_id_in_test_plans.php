<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTestlistIdInTestPlans extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('test_plans', function (Blueprint $table) {
            $table-> unsignedInteger("test_id")->default(0)->nullable()-> after("id");
            $table-> foreign("test_id")->references("id")->on("test_lists")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('test_plans', function (Blueprint $table) {
            //
        });
    }
}
