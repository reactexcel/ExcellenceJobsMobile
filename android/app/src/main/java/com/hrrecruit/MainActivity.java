package com.excellence.jobs;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.content.Intent;
import io.branch.rnbranch.*;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HrRecruit";
    }
    @Override
    protected void onStart() {
        Fabric.with(this, new Crashlytics());
        super.onStart();
        RNBranchModule.initSession(this.getIntent().getData(), this);
    }
    @Override
    public void onNewIntent (Intent intent) {
      super.onNewIntent(intent);
       setIntent(intent);
    }
}
