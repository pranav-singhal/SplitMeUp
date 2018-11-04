package com.example.harshitsinghal.ethsf;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.Map;

public class WebAppInterface
{
    Context context ;



    public WebAppInterface(Context context)
    {
        this.context = context  ;
    }




    @JavascriptInterface
    public String getPrivateKey()
    {

        SharedPreferences sharedPreferences = context.getSharedPreferences("file.private.key.end.to.end.encryption" , Context.MODE_PRIVATE) ;
        String result  = sharedPreferences.getString( "key" , null );

        return result ;

    }

    @JavascriptInterface
    public void sendPrivateKey(String string)
    {
        SharedPreferences.Editor editor = context.getSharedPreferences( "file.private.key.end.to.end.encryption" , Context.MODE_PRIVATE).edit();

        editor.putString( "key" , string );

        editor.apply();

        Toast.makeText(context , "Registered" , Toast.LENGTH_LONG).show();

    }


    @JavascriptInterface
    public void sendNewShard(String json_string)
    {

        Toast.makeText(context , "New Shard Received" , Toast.LENGTH_LONG).show();

        try
        {
            JSONObject json = new JSONObject(json_string);

            Iterator<String> iterator =  json.keys() ;

            if(iterator.hasNext())
            {

                String key = json.getString(iterator.next()) ;

                String value = json.getString(iterator.next()) ;

                SharedPreferences.Editor editor = context.getSharedPreferences( "file.shard.key.user.no.user.web" , Context.MODE_PRIVATE).edit();

                editor.putString( key , value );

                editor.apply();

            }else
            {
                Toast.makeText(context , "Value Not Found" , Toast.LENGTH_LONG).show();
            }


        }
        catch (JSONException exception)
        {
            Toast.makeText(context , "Value Not Found" , Toast.LENGTH_LONG).show();
        }




    }



    @JavascriptInterface
    public String requestForShard(String key)
    {
        Toast.makeText(context , "Shard Sent" , Toast.LENGTH_LONG).show();



        SharedPreferences sharedPreferences = context.getSharedPreferences("file.shard.key.user.no.user.web" , Context.MODE_PRIVATE) ;

        String result  = sharedPreferences.getString( key , null );


        return result ;

    }


}
