// Copy-to-clipboard for every command block
        document.querySelectorAll('.copy-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var block = btn.closest('.command-block');
                var code = block ? block.querySelector('code') : null;
                if (!code) return;

                var text = code.innerText;
                var original = btn.textContent;

                var done = function () {
                    btn.textContent = 'Copied';
                    setTimeout(function () {
                        btn.textContent = original;
                    }, 1500);
                };

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(done, function () {});
                } else {
                    var ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    try { document.execCommand('copy'); done(); } catch (e) {}
                    document.body.removeChild(ta);
                }
            });
        });

        // Auto-open a FAQ entry when it is linked directly (e.g. #miui-overwrite)
        function openTargetFaq() {
            if (!location.hash) return;

            var target;
            try {
                target = document.querySelector(location.hash);
            } catch (e) {
                return;
            }

            if (target && target.tagName === 'DETAILS') {
                target.open = true;
                target.setAttribute('open', '');
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        window.addEventListener('hashchange', openTargetFaq);
        window.addEventListener('load', openTargetFaq);