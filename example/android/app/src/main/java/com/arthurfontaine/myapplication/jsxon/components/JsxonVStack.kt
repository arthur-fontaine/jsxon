package com.arthurfontaine.myapplication.jsxon.components

import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.arthurfontaine.myapplication.jsxon.JsxonPayload

@Composable
fun JsxonHStack(jsxonPayload: JsxonPayload) {
    val children = jsxonPayload.children ?: emptyList()
    val gap = jsxonPayload.props["gap"] ?: 0

    Row(
//        modifier = Modifier.padding(gap.dp)
    ) {
        children.forEach { child ->
            Jsxon(jsxonPayload = child)
        }
    }
}
