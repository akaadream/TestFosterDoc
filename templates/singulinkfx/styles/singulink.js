// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.

// Theme toggle

(function () {
    var hljsDark = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/night-owl.min.css';
    var hljsLight = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css';

    function resolveTheme(setting) {
        return setting === 'auto'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : setting;
    }

    function applyTheme(setting) {
        var resolved = resolveTheme(setting);
        document.documentElement.setAttribute('data-theme-setting', setting);
        document.documentElement.setAttribute('data-bs-theme', resolved);
        var hljsLink = document.getElementById('hljs-theme');
        if (hljsLink) {
            hljsLink.href = resolved === 'light' ? hljsLight : hljsDark;
        }
    }

    // Set initial data-theme-setting (data-bs-theme is already set by inline script in head)
    var initial = localStorage.getItem('theme') || 'auto';
    document.documentElement.setAttribute('data-theme-setting', initial);

    // Listen for OS preference changes when in auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        var current = localStorage.getItem('theme') || 'auto';
        if (current === 'auto') {
            applyTheme('auto');
        }
    });

    // Expose toggle function globally
    window.toggleTheme = function () {
        var cycle = { auto: 'dark', dark: 'light', light: 'auto' };
        var current = localStorage.getItem('theme') || 'auto';
        var next = cycle[current] || 'auto';
        localStorage.setItem('theme', next);
        applyTheme(next);
    };
})();

function toggleMenu() {
               
    var sidebar = document.getElementById("sidebar");
    var blackout = document.getElementById("blackout");

    if (sidebar.style.left === "0px") 
    {
        sidebar.style.left = "-" + sidebar.getBoundingClientRect().width + "px";
        blackout.classList.remove("showThat");
        blackout.classList.add("hideThat");
    } 
    else 
    {
        sidebar.style.left = "0px";
        blackout.classList.remove("hideThat");
        blackout.classList.add("showThat");
    }
}

// jQuery .deepest(): https://gist.github.com/geraldfullam/3a151078b55599277da4

(function ($) {
    $.fn.deepest = function (selector) {
        var deepestLevel  = 0,
            $deepestChild,
            $deepestChildSet;
     
        this.each(function () {
            $parent = $(this);
            $parent
                .find((selector || '*'))
                .each(function () {
                    if (!this.firstChild || this.firstChild.nodeType !== 1) {
                        var levelsToParent = $(this).parentsUntil($parent).length;
                        if (levelsToParent > deepestLevel) {
                            deepestLevel = levelsToParent;
                            $deepestChild = $(this);
                        } else if (levelsToParent === deepestLevel) {
                            $deepestChild = !$deepestChild ? $(this) : $deepestChild.add(this);
                        }
                    }
                });
            $deepestChildSet = !$deepestChildSet ? $deepestChild : $deepestChildSet.add($deepestChild);
        });
            
        return this.pushStack($deepestChildSet || [], 'deepest', selector || '');
    };
}(jQuery));

$(function() {
    $('table').each(function(a, tbl) {
        var currentTableRows = $(tbl).find('tbody tr').length;
        $(tbl).find('th').each(function(i) {
            var remove = 0;
            var currentTable = $(this).parents('table');

            var tds = currentTable.find('tr td:nth-child(' + (i + 1) + ')');
            tds.each(function(j) { if ($(this).text().trim() === '') remove++; });

            if (remove == currentTableRows) {
                $(this).hide();
                tds.hide();
            }
        });
    });

    function scrollToc() {
        var activeTocItem = $('.sidebar').deepest('.sidebar-item.active')[0]
    
        if (activeTocItem) {
            activeTocItem.scrollIntoView({ block: "center" });
        }
        else{
            setTimeout(scrollToc, 500);
        }
    }

    setTimeout(scrollToc, 500);
});