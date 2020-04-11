<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Site_data;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\DB as FacadesDB;

class PostController extends Controller
{
    function index()
    {
        return view('frontend_sna/test');
    }

    //APi (post資料庫)

    // 取得全部資料
    function apiAll()
    {
        return response()->json(Post::all(), 200);
    }

    // 取得單一文章(use id)
    function apiFindPostById($id)
    {
        return response()->json(Post::find($id), 200);
    }

    // 建立一篇文章(成功回傳ok use json format)
    function apiCreatePost(Request $request)
    {
        $post = new Post;
        $post->title = $request->input('title', '標題');
        $post->body = $request->input('body', '沒有內文。');
        $ok = $post->save();

        return response()->json(['ok' => $ok], 200);
    }

    // 更新一篇文章(成功回傳ok use json format)
    function apiUpdatePostById(Request $request, $id)
    {
        $ok = false;
        $msg = '沒有錯誤碼';

        $post = Post::find($id);
        // 如果找到該id
        if ($post) {
            $post->title = $request->input('title', '我更新了標題');
            $post->body = $request->input('body', '我更新了內文。');
            $ok = $post->save();
            if (!$ok) $msg = '更新失敗，請檢查網路。';
        } else {
            $msg = '找不到該文章!';
        }
        return response()->json(['ok' => $ok, 'msg' => $msg], 200);
    }

    //刪除一篇文章
    function apiDeletePostById($id)
    {
        $rows = Post::destroy($id);
        $ok = ($rows > 0);
        return response()->json(['ok' => $ok], 200);
    }



    // R

    function runR_city(Request $request)
    {


        $id = "台北";
        $n = '"' . $id . '"';

        // 以外部指令的方式呼叫 R 進行繪圖->between_city.html

        $your_command = "Rscript R/site_Betweeness_2020.R $n";
        $process = new Process($your_command);
        $process->run(); // to run Sync

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        return response()->json(array('output' => $process->getOutput(), 'RhtmlCheck' => 'R/site_Betweeness_2020.R "城市"-> between_city.html。'), 200);
    }
    // 成功
    function runR_twoC(Request $request)
    {

        $name = $request->input('name');
        $c1 = $request->input('c1');
        $c20 = $request->input('c20');

        // $temp_d = "台北 博物館 特色博物館";
        $temp_d = "$name $c1 $c20";

        $cc = '"' . $temp_d . '"';

        // 以外部指令的方式呼叫 R 進行繪圖->between_relationship.html

        $your_command = "Rscript R/betweenss_attr_2020.R $cc";
        $process = new Process($your_command);
        $process->run(); // to run Sync

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return response()->json(array(
            'name' => $name,
            'c1' => $c1,
            'c20' => $c20,
            'output' => $process->getOutput(),
            'RhtmlCheck' => 'R/betweenss_attr_2020.R "a b c"-> between_relationship.html。'
        ), 200);
    }
    //路徑分析前置csv檔案，run path.php
    function runPHP(Request $request)
    {

        // 以外部指令的方式呼叫 R 進行繪圖->between_relationship.html

        $your_command = "php C:\\xampp\\htdocs\\SNA_sean\\exam58\\public\\php\\path.php";
        $process = new Process($your_command);
        $process->setTimeout(180);
        $process->run(); // to run Sync
        // $process->start(); // to run Async

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }


        return response()->json(array('response：' => $process->getOutput(), 'PHPCheck' => 'please check "public" dir has 2 csv data。'), 200);
    }
    // 路徑分析R圖
    function runRafterPHP(Request $request)
    {

        // 以外部指令的方式呼叫 R 進行繪圖->between_relationship.html

        $your_command = "Rscript php/new_path.R";
        $process = new Process($your_command);
        $process->run(); // to run Sync
        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        // $process->start(); // to run Async

        return response()->json(array('response：' => $process->getOutput(), 'RnewFileCheck' => '請確認是否R是否執行!'), 200);
    }

    // site_data API
    // 取所有景點(測試用，有設定量)
    function site_dataAll()
    {
        return response()->json(Site_data::where('id', '<', "S0005")->get(), 200);
    }

    // 取單一景點
    function site_dataById($id)
    {
        return response()->json(Site_data::find($id), 200);
    }
    function site_dataCityAll()
    {
        return response()->json(Site_data::select('city_name')->distinct()->get(), 200);
    }
}
