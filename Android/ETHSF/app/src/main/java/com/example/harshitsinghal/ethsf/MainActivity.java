package com.example.harshitsinghal.ethsf;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView browser = (WebView)findViewById(R.id.browser) ;

        browser.getSettings().setJavaScriptEnabled(true);

        browser.addJavascriptInterface(new WebAppInterface(getBaseContext()) , "Android");


        browser.setWebChromeClient(new WebChromeClient());

        browser.setWebViewClient(new WebViewClient() {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });


        browser.loadUrl("http://192.168.43.182:3000/phone");
    }
}
