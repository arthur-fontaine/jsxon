package com.arthurfontaine.myapplication

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.tooling.preview.Preview
import com.arthurfontaine.myapplication.jsxon.JsxonPayload
import com.arthurfontaine.myapplication.jsxon.components.Jsxon
import io.ktor.client.call.body
import io.ktor.client.request.*
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApp()
        }
    }
}

@Composable
fun MyApp() {
    // Remember the coroutine scope to launch suspend functions
    val scope = rememberCoroutineScope()

    // State to hold the JsxonPayload
    var jsxonPayload by remember { mutableStateOf<JsxonPayload?>(null) }

    // Fetch the Jsxon data when the composable is first launched
    LaunchedEffect(Unit) {
        scope.launch {
            jsxonPayload = getJsxonUi()
        }
    }

    // Show the data if it is available, otherwise show a loading text
    if (jsxonPayload != null) {
        Jsxon(jsxonPayload = jsxonPayload!!)
    } else {
        Text(text = "Loading...")
    }
}

suspend fun getJsxonUi(): JsxonPayload? {
    try {
        val response = httpClient.get("http://10.0.2.2:3000/pages/index.tsx")
        return response.body()
    } catch (e: Exception) {
        e.printStackTrace()
        return null
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    MyApp()
}
